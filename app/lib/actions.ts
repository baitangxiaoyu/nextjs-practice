'use server'
import { sql } from '@vercel/postgres';
import { signIn } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { AuthError } from 'next-auth';
//表单校验
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({invalid_type_error:'请选择一个客户名称'}),
  amount: z.coerce.number().gt(0,{message:'金额必须大于0'}),
  status: z.enum(['pending', 'paid'],{invalid_type_error:'请选择一个状态'}),
  date: z.string(),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
//错误信息-类型描述

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createInvoices(prevState:State,formData: FormData) {
  try {
    // safeParse()将返回包含 OR 字段的对象
    const vaildatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
    if (!vaildatedFields.success) {
      return {
        errors: vaildatedFields.error.flatten().fieldErrors,
        message:'创建发票失败'
      }
    }
    //创建发票逻辑
    const { customerId, amount, status } = vaildatedFields.data;
    const amountInCents  = amount * 100
    const date = new Date().toISOString().split('T')[0]
    
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.log('createInvoices',error)
  }

  //重新验证路径，清除此缓存并触发对服务器的新请求
  revalidatePath('/dashboard/invoice')
  redirect('/dashboard/invoices')
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export async function updateInvoice(id: string, formData: FormData) {
  try {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
  
    const amountInCents = amount * 100;
  
    await sql`UPDATE invoices SET customer_id=${customerId}, amount=${amountInCents}, status=${status}
    WHERE id=${id}
    `
  } catch (error) {
    console.log('updateInvoice',error)
  }

  revalidatePath('/dashboard/invoice')
  redirect('/dashboard/invoices')  
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id=${id}`
    revalidatePath('/dashboard/invoices')
  } catch (error) {
      console.log('deleteInvoice',error)
  }

}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}