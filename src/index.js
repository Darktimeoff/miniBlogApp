'use strict'
//@ts-check
import { HeaderComponent  } from './components/header.component';
import { NavigationComponent } from './components/navigation.component';
import { FavoriteComponent } from './components/favorite.component';
import { PostsComponent } from './components/posts.component';
import { CreateComponent } from './components/create.component';
import { LoaderComponent } from'./components/loader.component';
import '../dist/styles.css';

new HeaderComponent('header');

const navigation = new NavigationComponent('navigation');
const loader = new LoaderComponent('loader');
const favorite = new FavoriteComponent('favorite', { loader });
const posts = new PostsComponent('posts', { loader });
const create = new CreateComponent('create');

navigation.registerTabs([
    {name:'create', component: create},
    {name:'favorite', component: favorite},
    {name:'posts', component: posts}
]);

