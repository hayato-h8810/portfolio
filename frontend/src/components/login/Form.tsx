import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useLoginMutation } from '../../api/graphql'
import Icons from '../icons'

type FormInput = {
  email: string
  password: string
}

export default function Form() {
  const [emailServerError, setEmailServerError] = useState('')
  const [passwordServerError, setPasswordServerError] = useState('')
  const [sessionServerError, setSessionServerError] = useState('')
  const [loadingButton, setLoadingButton] = useState(false)
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    reValidateMode: 'onSubmit',
  })
  const [loginMutation, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login?.user) {
        history.push('/userHome')
      }
    },
    onError: (error) => {
      if (error?.message === 'EMAIL_ERROR') {
        setEmailServerError('このメールアドレスは登録されていません')
      } else if (error?.message === 'PASSWORD_ERROR') {
        setPasswordServerError('パスワードが正しくありません')
      } else if (error?.message === 'SESSION_ERROR') {
        setSessionServerError('既にログインしています。一度ログアウトしてからお試しください。')
      }
    },
  })
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    loginMutation({ variables: { credentials: { password: data.password, email: data.email } } })
  }
  useEffect(() => {
    if (loading) {
      setLoadingButton(true)
    } else {
      setLoadingButton(false)
    }
  }, [loading])

  return (
    <>
      <Icons props={{ reset }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputField>
            <div className="inputValue">メールアドレス:</div>
            <TextField
              {...register('email', {
                required: { value: true, message: 'メールアドレス欄の入力は必須です' },
                pattern: {
                  value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/,
                  message: '無効なメールアドレスです',
                },
              })}
              type="text"
              variant="outlined"
              label="メールアドレス"
              inputProps={{
                'data-cy': 'email',
              }}
            />
          </InputField>
          <EmailErrorContainer>
            {emailServerError !== '' && (
              <ErrorField>
                <p className="errorValue">{emailServerError}</p>
              </ErrorField>
            )}
            {errors.email?.message && (
              <ErrorField>
                <p className="errorValue" data-cy="errorMessage">
                  {errors.email.message}
                </p>
              </ErrorField>
            )}
          </EmailErrorContainer>
          <InputField>
            <div className="inputValue">パスワード:</div>
            <TextField
              {...register('password', { required: true })}
              type="password"
              variant="outlined"
              label="パスワード"
              inputProps={{
                'data-cy': 'password',
              }}
            />
          </InputField>
          <PasswordErrorContainer>
            {passwordServerError !== '' && (
              <ErrorField>
                <p className="errorValue" data-cy="errorMessage">
                  {passwordServerError}
                </p>
              </ErrorField>
            )}
            {errors.password && (
              <ErrorField>
                <p className="errorValue">パスワード欄の入力は必須です</p>
              </ErrorField>
            )}
          </PasswordErrorContainer>
        </InputContainer>
        {sessionServerError !== '' && (
          <ServerErrorContainer>
            <p className="errorValue" data-cy="errorMessage">
              {sessionServerError}
            </p>
          </ServerErrorContainer>
        )}
        <LoadingButton
          loading={loadingButton}
          variant="contained"
          type="submit"
          onClick={() => {
            setEmailServerError('')
            setPasswordServerError('')
            setSessionServerError('')
          }}
          data-cy="button"
        >
          ログイン
        </LoadingButton>
      </form>
    </>
  )
}

const InputContainer = styled.div`
  position: relative;
  padding-top: 80px;
  margin-left: auto;
  margin-right: auto;
  width: 470px;
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
`

const InputField = styled.div`
  padding-bottom: 120px;
  .inputValue {
    padding-top: 5px;
    display: inline-block;
    position: absolute;
    right: 65%;
    font-size: 13px;
    z-index: 2;
  }
  .MuiTextField-root {
    width: 225px;
    position: absolute;
    right: 10%;
    z-index: 2;
  }
  .MuiTextField-root label {
    font-size: 0.7rem;
    top: -7px;
  }
  .MuiTextField-root input {
    height: 0.01rem;
    font-size: 0.8rem;
    font-weight: normal;
    background-color: #ffffff;
  }
`

const EmailErrorContainer = styled.div`
  background: #f6f6f6;
  height: 30px;
  width: 100%;
  position: absolute;
  top: 30%;
  z-index: 1;
`

const PasswordErrorContainer = styled.div`
  background: #f6f6f6;
  height: 30px;
  width: 100%;
  position: absolute;
  top: 67%;
  z-index: 1;
`

const ErrorField = styled.div`
  background: #f6f6f6;
  height: 37px;
  position: relative;
  .errorValue {
    font-size: 5px;
    position: absolute;
    left: 40%;
    top: 32%;
    color: red;
  }
`

const ServerErrorContainer = styled.div`
  height: 30px;
  width: 100%;
  position: absolute;
  top: 83.5%;
  .errorValue {
    font-size: 5px;
    color: red;
    text-align: center;
  }
`
