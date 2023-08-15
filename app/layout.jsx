import '../styles/globals.css';
// import Provider from '@/app/components/Provider';
import Provider from '@/components/Provider';

export const metadata = {
    title: "Twitter",
    description: 'Share you tweets'
}

 


const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
        <main className="app">
          
            {children}
        </main>
       </Provider>
      </body>
    </html>
  )
}

export default RootLayout

