import { Component, Input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';


 // Run a subscription to get the latest public todo
 const NOTIFY_NEW_PUBLIC_TODOS = gql`
  subscription notifyNewPublicTodos {
    todos (where: { is_public: { _eq: true}}, limit: 1, order_by: {created_at: desc }) {
      id
      created_at
    }
  }
 `;

 // Type for new public todos
 interface Todo {
   id: number;
   created_at: Date;
 }
 interface NewPublicTodos {
   todos: Todo[];
 }

@Component({
  selector: 'TodoPublicList',
  templateUrl: './TodoPublicList.template.html',
})

export class TodoPublicList {
  olderTodosAvailable = true;
  oldestTodoId;
  newestTodoId;
  newTodosCount = 1;
  todos = [
    // {
    //   id: '1',
    //   title: 'This is public todo 1',
    //   user: {
    //     name: 'someUser1'
    //   }
    // },
    // {
    //   id: '2',
    //   title: 'This is public todo 2',
    //   is_completed: false,
    //   is_public: true,
    //   user: {
    //     name: 'someUser2'
    //   }
    // },
    // {
    //   id: '3',
    //   title: 'This is public todo 3',
    //   user: {
    //     name: 'someUser3'
    //   }
    // },
    // {
    //   id: '4',
    //   title: 'This is public todo 4',
    //   user: {
    //     name: 'someUser4'
    //   }
    // }
  ]

  loading: boolean = true;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.apollo.subscribe<NewPublicTodos>({
      query: NOTIFY_NEW_PUBLIC_TODOS,
    }).subscribe(({ data }) => {
      this.loading = false;
      if(data) {
        const latestTodo = data.todos.length ? data.todos[0] : null;
        this.olderTodosAvailable = latestTodo? true: false;
        this.oldestTodoId=latestTodo? (latestTodo.id + 1) : 0 ;
        if (latestTodo && latestTodo.id > this.newestTodoId) {
          this.newestTodoId = latestTodo.id;
          this.newTodosCount = this.newTodosCount +1;
        } else {
          this.newestTodoId=latestTodo? latestTodo.id : 0;
          this.loadOlder();
        }
      }
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  loadNew() {

    console.log("Clicked")
      const GET_NEW_PUBLIC_TODOS = gql`
            query getNewPublicTodos ($latestVisibleId: Int!) {
              todos(where: { is_public: { _eq: true}, id: {_gt: $latestVisibleId}}, order_by: { created_at: desc }) {
                id
                title
                created_at
                user {
                  name
                }
              }
            }
          `;
          this.apollo.watchQuery({
            query: GET_NEW_PUBLIC_TODOS,
            variables: {latestVisibleId: this.todos[0].id}
          })
          .valueChanges
          .subscribe(({ data, loading }) => {
            const todosData : any = data;
            if(todosData) {
              this.newestTodoId = todosData.todos[0].id;
              this.todos = [...todosData.todos, ...this.todos]
              this.newTodosCount=0;
            }
            console.log('got data', data);
          },(error) => {
            console.log('there was an error sending the query', error);
          });
      }
    

  loadOlder() {
        const GET_OLD_PUBLIC_TODOS = gql`
          query getOldPublicTodos ($oldestTodoId: Int!) {
            todos (where: { is_public: { _eq: true}, id: {_lt: $oldestTodoId}}, limit: 7, order_by: { created_at: desc }) {
              id
              title
              created_at
              user {
                name
              }
            }
          }`;
        this.apollo.watchQuery({
          query: GET_OLD_PUBLIC_TODOS,
          variables: {oldestTodoId: this.oldestTodoId}
        })
        .valueChanges
        .subscribe(({ data }) => {
          const todosData : any = data;
          if(todosData) {
            if (todosData.todos.length) {
              this.oldestTodoId = todosData.todos[todosData.todos.length - 1].id;
              this.todos = [...this.todos, ...todosData.todos]
            } else {
              this.olderTodosAvailable = false;
            }
          }
          console.log('got data', data);
        },(error) => {
          console.log('there was an error sending the query', error);
       });
    }
    

}
