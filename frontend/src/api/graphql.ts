import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Auth_Provider_Credentials = {
  email: Scalars['String']
  password: Scalars['String']
}

export type AuthProviderSignupData = {
  credentials?: InputMaybe<Auth_Provider_Credentials>
}

/** Autogenerated input type of CreateUser */
export type CreateUserInput = {
  authProvider?: InputMaybe<AuthProviderSignupData>
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

/** Autogenerated input type of DeleteUser */
export type DeleteUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  password: Scalars['String']
}

/** Autogenerated return type of DeleteUser */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  user?: Maybe<User>
}

/** Autogenerated input type of Login */
export type LoginInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  credentials?: InputMaybe<Auth_Provider_Credentials>
}

/** Autogenerated return type of Login */
export type LoginPayload = {
  __typename?: 'LoginPayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  user?: Maybe<User>
}

/** Autogenerated return type of Logout */
export type LogoutPayload = {
  __typename?: 'LogoutPayload'
  id?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<User>
  deleteUser?: Maybe<DeleteUserPayload>
  login?: Maybe<LoginPayload>
  logout?: Maybe<LogoutPayload>
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type Query = {
  __typename?: 'Query'
  currentUser?: Maybe<User>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
}

export type CreateUserMutationVariables = Exact<{
  credentials: Auth_Provider_Credentials
  name: Scalars['String']
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser?: { __typename?: 'User'; id: string; name: string; email: string } | null
}

export type DeleteUserMutationVariables = Exact<{
  password: Scalars['String']
}>

export type DeleteUserMutation = {
  __typename?: 'Mutation'
  deleteUser?: {
    __typename?: 'DeleteUserPayload'
    user?: { __typename?: 'User'; id: string; name: string; email: string } | null
  } | null
}

export type LoginMutationVariables = Exact<{
  credentials: Auth_Provider_Credentials
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'LoginPayload'
    user?: { __typename?: 'User'; id: string; name: string; email: string } | null
  } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = {
  __typename?: 'Mutation'
  logout?: { __typename?: 'LogoutPayload'; id?: string | null } | null
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  currentUser?: { __typename?: 'User'; id: string; name: string; email: string } | null
}

export const CreateUserDocument = gql`
  mutation createUser($credentials: AUTH_PROVIDER_CREDENTIALS!, $name: String!) {
    createUser(input: { name: $name, authProvider: { credentials: $credentials } }) {
      id
      name
      email
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options)
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>
export const DeleteUserDocument = gql`
  mutation deleteUser($password: String!) {
    deleteUser(input: { password: $password }) {
      user {
        id
        name
        email
      }
    }
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options)
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>
export const LoginDocument = gql`
  mutation login($credentials: AUTH_PROVIDER_CREDENTIALS!) {
    login(input: { credentials: $credentials }) {
      user {
        id
        name
        email
      }
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const LogoutDocument = gql`
  mutation logout {
    logout {
      id
    }
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>
export const CurrentUserDocument = gql`
  query currentUser {
    currentUser {
      id
      name
      email
    }
  }
`

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options)
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options)
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>
