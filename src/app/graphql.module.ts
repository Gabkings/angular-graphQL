import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';

import { WebSocketLink } from '@apollo/client/link/ws';


const uri = 'https://hasura.io/learn/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    // link: httpLink.create({uri,
    //   headers: new HttpHeaders( {
    //     "Authorization":`Bearer ${localStorage.getItem('token')}`
    //   })

    //   // headers: new HttpHeaders(
    //   //   "Authorization",
    //   //   `Bearer ${localStorage.getItem("token")}` || null,
    //   // )
    // }),
    
    link: new WebSocketLink({
      uri: 'wss://hasura.io/learn/graphql',
      options: {
        reconnect: true,
        connectionParams: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
      }
    }),
    
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
