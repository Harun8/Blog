export const typeDefs = `#graphql 

type Query {
    apiStatus:ApiStatus
    blogPost(id: ID): [BlogPost]
}

type Mutation {
    createUser(input: UserInput): User
    createBlogPost(input: CreateBlogPost): BlogPost
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
    firstName: String
    lastName: String
    email: String
    password: String
}

type User {
    firstName : String
    lastName: String
    email: String
}

`;
