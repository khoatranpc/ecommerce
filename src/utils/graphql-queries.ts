export const queryUserLogin = `#graphql
    mutation Mutation($input: UserLoginInput) {
    userLogin(input: $input) {
        access_token
        refresh_token
    }
}
`;


export const queryGetCurrentUser = `#graphql
    query Query($input: GetCurrentUserInput){
        getCurrentUser(input: $input) {
            _id
            name
            email
            dob
            phoneNumber
            address
            createdAt
            updatedAt
            status
            role
        }
    }
`;