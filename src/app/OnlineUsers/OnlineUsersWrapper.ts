import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';


const SUBSCRIBE_TO_ONLINE_USERS = gql`
subscription getOnlineUsers {
 online_users(order_by: {user: {name: asc }}) {
   id
   user {
     name
   }
 }
}`

// type for SUBSCRIBE_TO_ONLINE_USERS subscription
interface User {
  id: number;
  user: {
    name: string
  };
}
interface GetOnlineUsersSub {
  online_users: User[];
}


@Component({
  selector: 'OnlineUsersWrapper',
  templateUrl: './OnlineUsersWrapper.template.html',
})

export class OnlineUsersWrapper {
  onlineUsers = [
    // { name: 'someUser1' },
    // { name: 'someUser2' }
  ];

  onlineIndicator: any;
  loading = true;

  constructor(private apollo: Apollo) {}

  ngOnInit(){
    // Every 20s, run a mutation to tell the backend that you're online
    this.onlineIndicator = setInterval(() => this.updateLastSeen(), 20000);
    this.apollo.subscribe<GetOnlineUsersSub>({
      query: SUBSCRIBE_TO_ONLINE_USERS,
    }).subscribe(({ data }) => {
      if(data) {
        const users = data.online_users;
        this.loading = false;
        this.onlineUsers = [];
          users.forEach((u, index) => {
            this.onlineUsers.push(u.user)
          })
      }
      console.log('got data ', data);
    },
    (error) => {
        console.log('there was an error sending the query', error);
    });
  }


  updateLastSeen() {
    // Use the apollo client to run a mutation to update the last_seen value
    const UPDATE_LASTSEEN_MUTATION=gql`
      mutation updateLastSeen ($now: timestamptz!) {
        update_users(where: {}, _set: {last_seen: $now}) {
          affected_rows
        }
      }`;
    this.apollo.mutate({
      mutation: UPDATE_LASTSEEN_MUTATION,
      variables: {now: (new Date()).toISOString()}
    }).subscribe(({ data }) => {
      console.log('got data ', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

}
