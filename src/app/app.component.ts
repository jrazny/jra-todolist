import { Component } from '@angular/core';
import { collectionData, Firestore, collection, initializeFirestore, doc } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  todos$: Observable<any>;
  todos: Array<any>;
  todoText: string = '';

  constructor(private firestore: Firestore) {
    const coll = collection(firestore, 'todos');
    this.todos$ = collectionData(coll);

    this.todos$.subscribe( (newTodoes) => {
      console.log('Neue Todoes sind: ', newTodoes);
      this.todos = newTodoes;
      // Ton abspielen oder Nachricht anzeigen etc.
    });

      // oder diese Variante - obere Var ist besser. da mehr Möglichkeiten - z.B. Ton abspielen oder Nachricht anzeigen
      // export class AppComponent {
      //   todos$: Observable<any>;

      //   constructor(firestore: Firestore) {
      //     const coll = collection(firestore, 'todos');
      //     this.todos$ = collectionData(coll);
      //   }
      // }

  }

  addTodo() {
    const coll = collection(this.firestore, 'todos');
    setDoc(doc(coll), {name: this.todoText});
  }
}


