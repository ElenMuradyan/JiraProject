'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import log from '../../../public/login.svg';
import reg from '../../../public/register.svg';
import '../../styles/auth.css';
import { useRouter } from 'next/navigation';
import { ROUTE_CONSTANTS } from '@/utilis/constants';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    const mode = searchParams.get('mode')
    setIsSignUp(mode === 'signup')
  }, [searchParams])

  return (
    <>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        integrity="sha512-..."
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

    <div className={`layout-container ${isSignUp ? 'sign-up-mode' : 'sign-in-mode'}`}>
        <div className='forms-container'>
            <div className="signin-signup">
                {children}
            </div>
        </div>
        <div className="panels-container">
            <div className="panel left-panel">
                <div className='content'>
                    <h3>New here ?</h3>
                    <p>A modern Jira-style project management app for streamlined task tracking, team collaboration, and efficient workflow management.</p>
                    <button className='btn transparent' id='sign-up-btn' onClick={() => push(ROUTE_CONSTANTS.REGISTER)}>Sign up</button>
                </div>

                <img src={log.src} alt="image" className='image'/>
            </div>

            <div className="panel right-panel">
                <div className='content'>
                    <h3>One of us ?</h3>
                    <p>A modern Jira-style project management app for streamlined task tracking, team collaboration, and efficient workflow management.</p>
                    <button className='btn transparent' id='sign-up-btn' onClick={() => push(ROUTE_CONSTANTS.LOGIN)}>Sign in</button>
                </div>

                <img src={reg.src} alt="image" className='image'/>
            </div>

        </div>
      </div>
    </>
  )
}
