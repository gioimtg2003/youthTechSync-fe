'use client';

import { InputForm } from '@/components/common';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useLogin } from '@/services/v1/auth/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TLoginSchema } from '../zod';
import LoginSchema from '../zod/login-schema.zod';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { mutate, isPending } = useLogin({});

  const methods = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submitLogin = (data: TLoginSchema) => {
    console.log('🚀 ~ submitLogin ~ data:', data);
    mutate(data);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl text-primary'>Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(submitLogin)}>
            <div className='grid gap-6'>
              <div className='flex flex-col gap-4'>
                <Button
                  variant='outline'
                  className='w-full cursor-pointer'
                  childrenClassName='gap-2'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                      fill='currentColor'
                    />
                  </svg>
                  <span>Login with Google</span>
                </Button>
              </div>
              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                <span className='bg-card text-muted-foreground relative z-10 px-2'>
                  Or continue with
                </span>
              </div>
              <div className='grid gap-6'>
                <div className='grid gap-3'>
                  <InputForm
                    control={methods.control}
                    name='username'
                    label='Username'
                    placeholder={'example'}
                  />
                </div>
                <div className='grid gap-3'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                    <a
                      href='#'
                      className='ml-auto text-sm underline-offset-4 hover:underline'
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <InputForm
                    control={methods.control}
                    name='password'
                    type='password'
                    placeholder='Your password'
                  />
                </div>
                <Button
                  type='submit'
                  className='w-full cursor-pointer'
                  loading={isPending}
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
