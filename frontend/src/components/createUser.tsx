import { useHistory } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import LoadingButton from '@mui/lab/LoadingButton'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useCreateUserMutation } from '../api/graphql'

type FormInput = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function CreateUser() {
  const [emailServerError, setEmailServerError] = useState('')
  const [sessionServerError, setSessionServerError] = useState('')
  const [loadingButton, setLoadingButton] = useState(false)
  const history = useHistory()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    reValidateMode: 'onSubmit',
  })

  const [createUser, { loading }] = useCreateUserMutation({
    onCompleted: (data) => {
      console.log(data.createUser?.id)
      if (data.createUser?.id) {
        history.push(`/${data.createUser.id}`)
      }
    },
    onError: (error) => {
      console.log(error)
      if (error?.message === 'EMAIL_ERROR') {
        setEmailServerError('このメールアドレスは既に使用されています')
      } else if (error?.message === 'SESSION_ERROR') {
        setSessionServerError('既にログインしています。一度ログアウトしてからお試しください。')
      }
    },
  })

  useEffect(() => {
    if (loading) {
      setLoadingButton(true)
    } else {
      setLoadingButton(false)
    }
  }, [loading])

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data)
    createUser({ variables: { name: data.name, credentials: { password: data.password, email: data.email } } })
  }

  return (
    <Container>
      <RefreshIconContainer>
        <IconButton>
          <RefreshIcon style={{ color: '#adadad', fontSize: '30px' }} />
        </IconButton>
      </RefreshIconContainer>
      <QuestionIconContainer>
        <IconButton size="small">
          <QuestionMarkIcon style={{ color: 'white', fontSize: '20px' }} />
        </IconButton>
      </QuestionIconContainer>
      <h1>ユーザー新規作成</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputField>
            <div className="inputValue">名前:</div>
            <TextField
              {...register('name', { required: true })}
              type="text"
              label="名前"
              variant="outlined"
              size="small"
              inputProps={{
                'data-cy': 'name',
              }}
            />
          </InputField>
          <NameErrorContainer>
            {errors.name && (
              <ErrorField>
                <p className="errorValue" data-cy="errorMessage">
                  名前欄の入力は必須です
                </p>
              </ErrorField>
            )}
          </NameErrorContainer>
          <InputField>
            <div className="inputValue">メールアドレス:</div>
            <TextField
              {...register('email', {
                required: { value: true, message: 'email欄の入力は必須です' },
                pattern: {
                  value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/,
                  message: '無効なメールアドレスです',
                },
              })}
              type="text"
              label="メールアドレス"
              variant="outlined"
              size="small"
              inputProps={{
                'data-cy': 'email',
              }}
            />
          </InputField>
          <EmailErrorContainer>
            {emailServerError !== '' && (
              <ErrorField>
                <p className="errorValue" data-cy="serverErrorMessage">
                  {emailServerError}
                </p>
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
              {...register('password', {
                required: { value: true, message: 'パスワード欄の入力は必須です' },
                minLength: { value: 6, message: 'パスワードは6文字以上、12文字以下です' },
                maxLength: { value: 12, message: 'パスワードは6文字以上、12文字以下です' },
              })}
              type="password"
              label="パスワード(6文字以上、12文字以下)"
              variant="outlined"
              size="small"
              inputProps={{
                'data-cy': 'password',
              }}
            />
          </InputField>
          <PasswordErrorContainer>
            {errors.password?.message && (
              <ErrorField>
                <p className="errorValue" data-cy="errorMessage">
                  {errors.password.message}
                </p>
              </ErrorField>
            )}
          </PasswordErrorContainer>
          <InputField>
            <div className="inputValue">パスワード(確認):</div>
            <TextField
              {...register('confirmPassword', { validate: (value) => getValues('password') === value })}
              type="password"
              label="パスワード(確認)"
              variant="outlined"
              size="small"
              inputProps={{
                'data-cy': 'confirmPassword',
              }}
            />
          </InputField>
          <ConfirmPasswordErrorContainer>
            {errors.confirmPassword && (
              <ErrorField>
                <p className="errorValue" data-cy="errorMessage">
                  入力値が一致しません
                </p>
              </ErrorField>
            )}
          </ConfirmPasswordErrorContainer>
        </InputContainer>
        {sessionServerError !== '' && (
          <ServerErrorContainer>
            <p className="errorValue" data-cy="serverErrorMessage">
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
            setSessionServerError('')
          }}
          data-cy="button"
        >
          登録
        </LoadingButton>
      </form>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: 544px;
  margin-top: 60px;
  width: 676px;
  background: #fefefe;
  margin-left: auto;
  margin-right: auto;
  > h1 {
    padding-top: 70px;
    font-size: 30px;
    text-align: center;
  }
  .MuiLoadingButton-root {
    position: absolute;
    top: 87%;
    left: 45%;
    background: #20a1ff;
  }
`

const RefreshIconContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 40px;
`

const QuestionIconContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 45px;
  .MuiIconButton-root {
    background: #ffc120;
    :hover {
      background: #ffc120;
    }
  }
`

const InputContainer = styled.div`
  position: relative;
  padding-top: 44px;
  padding-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
  width: 470px;
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
`

const InputField = styled.div`
  padding-bottom: 63px;
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
    right: 13%;
    z-index: 2;
  }
  .MuiTextField-root label {
    font-size: 0.7rem;
    top: -2px;
  }
  .MuiTextField-root input {
    height: 1em;
    font-size: 0.8rem;
    font-weight: normal;
    background-color: #ffffff;
  }
`

const NameErrorContainer = styled.div`
  background: #f6f6f6;
  height: 30px;
  width: 100%;
  position: absolute;
  top: 60px;
  z-index: 1;
`

const EmailErrorContainer = styled.div`
  background: #f6f6f6;
  height: 30px;
  width: 100%;
  position: absolute;
  top: 123px;
  z-index: 1;
`

const PasswordErrorContainer = styled.div`
  background: #f6f6f6;
  height: 30px;
  width: 100%;
  position: absolute;
  top: 186px;
  z-index: 1;
`

const ConfirmPasswordErrorContainer = styled.div`
  background: #f6f6f6;
  height: 30px;
  width: 100%;
  position: absolute;
  top: 249px;
  z-index: 1;
`

const ErrorField = styled.div`
  background: #f6f6f6;
  height: 37px;
  position: relative;
  .errorValue {
    font-size: 11px;
    position: absolute;
    left: 40%;
    top: 17%;
    color: red;
  }
`

const ServerErrorContainer = styled.div`
  height: 30px;
  width: 100%;
  position: absolute;
  top: 82%;
  .errorValue {
    font-size: 11px;
    color: red;
    text-align: center;
  }
`
