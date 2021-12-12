import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
  })
  
export class FilterPipe implements PipeTransform  {
    
    transform(blogs: any, term: any): any {
        // check if search term is undefined
        if(term === undefined) return blogs;
        return blogs.filter((blog: { title: string; })=>{ // javascript filter(function)
          // if below is false, then topic will be removed from topics array
          return blog.title.toLowerCase().includes(term.toLowerCase());
        });
      }
}
