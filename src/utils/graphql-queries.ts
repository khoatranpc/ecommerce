import { IPayloadGraphql } from "./../types/index";
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

export const queryUserRegister = `#graphql
    mutation Mutation($input: UserRegisterInput) {
        userRegister(input: $input){
            _id
            name
            email
            password
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

export const queryShopInfoByOwnerId = `#graphql
    query Query($input: GetShopByOwnerIdInput) {
        getShopByOwnerId(input: $input) {
            _id
            description
            email
            facebook
            instagram
            logo
            name
            phone
            tiktok
            youtube
            servicePackage
            address {
                province
                district
                ward
                detail
            }
            owner {
                _id
                name
                email
                password
                dob
                phoneNumber
                address
                createdAt
                updatedAt
                status
                role
            }
        }
    }
`;

export const queryCreateShopInfo = `#graphql
    mutation CreateShopInfo($input: SaveShopInfoInput) {
    createShopInfo(input: $input) {
    
        address {
            detail
            district
            province
            ward
        }
        description
        email
        facebook
        instagram
        logo
        name
        phone
        servicePackage
        tiktok
        youtube
        owner {
            _id
            address
            createdAt
            dob
            email
            name
            password
            phoneNumber
            role
            status
            updatedAt
        }
    }
    }
`;

export const queryGetShopInfo = `#graphql
    query GetShopByOwnerId($input: GetShopByOwnerIdInput) {
        getShopByOwnerId(input: $input) {
            _id
            address {
                detail
                district
                province
                ward
            }
            description
            email
            facebook
            instagram
            logo
            name
            owner {
                _id
                address
                createdAt
                dob
                email
                name
                password
                phoneNumber
                role
                status
                updatedAt
            }
            phone
            servicePackage
            tiktok
            youtube
        }
    }
`;