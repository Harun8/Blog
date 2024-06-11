export const typeDefs = `#graphql 

type Query {
    apiStatus:[ApiStatus]
    blogPost(id: ID): [BlogPost]
    login(input: UserInput) : AuthPayload
    abilities: [Ability]
}

type Mutation {
    createUser(input: UserInput): AuthPayload
    createBlogPost(input: CreateBlogPost): BlogPost
}

type Ability {

    action: String
    subject : String
    
}



type ApiStatus {
    status : String
}

type BlogPost {
    _id: ID!,
    author: String,
    title: String,
    content: String,
    img: String
}

input CreateBlogPost {
    author: String,
    title: String,
    content: String,
    img: String
}

input UserInput {
    email: String
    password: String
}

type User {

    email: String
    _id: String
}


type AuthPayload {
    token: String
    user: User
}

`;
