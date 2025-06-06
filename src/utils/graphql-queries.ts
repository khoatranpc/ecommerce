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

export const queryGetCategories = (fieldsQuery?: string) => {
  return `#graphql
    query GetCategories($input: FilterCategoriesInput) { 
        getCategories(input: $input) {
            ${
              fieldsQuery ??
              `
            data {
                _id
                name
                description
                slug
                status
                imageUrl
                createdAt
                updatedAt
                parentCategory {
                    _id
                    name
                    description
                    slug
                    status
                    imageUrl
                }
                shop {
                    _id
                    email
                    facebook
                    instagram
                    logo
                    name
                    phone
                    servicePackage
                }
                createdBy {
                    email
                    status
                    role
                    name
                    _id
                }
            }
            paginate {
                page
                total
                pages
                limit
            }
            `
            }
        }
    }
  `;
};

export const queryCreateCategory = `#graphql
    mutation CreateCategory ($input: CreateCategoryInput) {
        createCategory(input: $input) {
            _id
            name
            description
            slug
            parentCategory {
                _id
            }
            status
            imageUrl
            createdBy {
                _id
            }
            updatedBy {
                _id
            }
            shop {
                _id
            }
            createdAt
            updatedAt
        }
    }
`;

export const queryCreateProduct = `#graphql
    mutation Mutation($input: CreateProductInput) {
        createProduct(input: $input) {
                _id
        }
    }
`;

export const queryProducts = `#graphql
    query Query($input: GetProductsInput) {
        getProducts(input: $input) {
            data {
                _id
                createdBy {
                    _id
                    name
                }
                description
                images
                name
                stock
                price
                shop {
                    _id
                    name
                    owner {
                        name
                        email
                        _id
                    }
                }
                sku
                slug
                status
                updatedAt
                variants {
                    _id
                    attributes {
                        key
                        value
                    }
                    imageIndex
                    price
                    sku
                    status
                    stock
                    name
                }
            }
            paginate {
                limit
                page
                pages
                total
            }
        }
    }
`;

export const queryGetProductBySlug = `#graphql
    query GetProductBySlug($input: GetProductBySlugInput) {
        getProductBySlug(input: $input) {
            _id
            categories {
                _id
                name
            }
            createdAt
            createdBy {
                _id
                name
                email
            }
            description
            images
            name
            price
            shop {
                _id
                name
                owner {
                    _id
                    name
                }
                logo
            }
            sku
            slug
            status
            stock
            updatedAt
            variants {
                _id
                attributes {
                    key
                    value
                }
                imageIndex
                name
                price
                sku
                status
                stock
            }
            updatedBy {
                _id
            }
        }
    }
`;

export const queryUpdateProductById = `#graphql
    mutation UpdateProductById($input: UpdateProductInput) {
        updateProductById(input: $input) {
            _id
        }
    }
`;

export const queryGetOnePost = (fields?: string) => {
  return `#graphql
    query GetOnePost ($input: GetOnePostInput) {
        getOnePost(input: $input ) {
            ${
              fields ??
              `
                _id
                title
                slug
                description
                content
                tags
                banner
                status
                views
                createdAt
                updatedAt
                categories {
                    _id
                    createdAt
                    updatedAt
                    status
                }
                product {
                    _id
                }
            `
            }
            
        }
    }
`;
};

export const queryCreateAPost = `#graphql
    mutation CreateAPost($input: CreateAPostInput) {
        createAPost (input: $input) {
            _id
            title
            slug
            description
            content
            author
            tags
            categories
            images
            product
            banner
            status
            views
            createdAt
            updatedAt
        }
    }
`;

export const queryInsertToCart = `#graphql
    mutation InsertToCart($input: InsertToCartInput){
        insertToCart(input: $input) {
            _id
        }
    }
`;

export const queryGetCarts = `#graphql
    query queryGetCarts($input: GetCartsInput){
        getCarts(input: $input) {
            _id
            user {
                _id
                name
            }
            items {
                _id
                product {
                    _id
                    images
                    variants {
                        _id
                        name
                        attributes {
                            key
                            value
                        }
                        imageIndex
                        status
                }
                }
                variant
                quantity
                price
                createdAt
                updatedAt
            }
            totalAmount
            status
            shop {
                _id
                name
                logo
            }
            createdAt
            updatedAt
        }
    }
`;
