import NextAuth from "next-auth"

import GoogleProvider from 'next-auth/providers/google'
 
 
 


export const authOptions =  {
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      // ...add more providers here
    ],
    
    callbacks: {
      
      async jwt({ token, account,user }) {
        // Persist the OAuth access_token to the token right after signin
         
       

        if (account) {
          token.accessToken = account.access_token
          
        }
        if(user){
          token.userId = user.id;
        }
        
        return token
      },
      async redirect({ url, baseUrl }) {
        return baseUrl
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token from a provider.
         session.user.id =  token.userId
       
          
        return session
      }
    }
    
  }
  
  const handler = NextAuth(authOptions)


export {handler as GET, handler as POST};






 
