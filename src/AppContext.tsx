import React from 'react';

export interface IAppContextProviderData{
     userName: string
}

const AppContext = React.createContext<IAppContextProviderData | null>(null);

export default function AppContextProvider(props: any){

     return (

          <AppContext.Provider
               value={{
                    userName: "Ergin"
               }}>
               {props.children}
          </AppContext.Provider>

     );

}

export const AppContextConsumer = AppContext.Consumer;