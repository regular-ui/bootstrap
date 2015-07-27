import Regular from 'regularjs';

const tpl = `
<ul class="pagination" r-hide={!total||total===0}>
  <li on-click={ this.nav(current-1)} class='pageprv {current==1? "disabled": ""}'>
    <a  href='#' >{ @(ptext || 'PREV' )}</a>
  </li>
  {#if total - 5 > show * 2}
  <li  on-click={ this.nav(1)} class={current==1? 'active': ''}><a href="#">1</a></li>
  {#if begin > 2}<li><a>...</a></li>{/if}
  {#list begin..end as i}
    <li on-click={ this.nav(i)} class={current==i? 'active': ''}><a href="#">{i}</a></li>
  {/list}
  {#if (end < total-1)}
    <li><a>...</a></li>
  {/if}
  <li r-hide={end <= total-1}><a>...</a></li>
  <li on-click={ this.nav(total) } class={ current==total? 'active': ''}> <a href="#">{total}</a></li>
  {#else}
    {#list 1..total as i}
    <li on-click={ this.nav(i)} class={current==i? 'active': ''}><a href="#">{i}</a></li>
    {/list}
  {/if}
  <li on-click={ this.nav(current + 1)} class='pagenxt {current==total? "disabled": ""}'><a  href='#' >{ @(ntext || 'NEXT') }</a></li>
</ul>
`

export default Regular.extend({

  name: "pagination",

  template: tpl,

  config(data){

    let count =  5;
    let show = data.show = Math.floor( count/2 );
    data.current = parseInt( data.current || 1, 10 );
    data.total = parseInt( data.total || 1, 10 );

    this.$watch(['current', 'total'], function( current, total ){
      if( current > total ) return this.nav(total)
      
      data.begin = current - show;
      data.end = current + show;

      if( data.begin < 2 ) data.begin = 2;
      if( data.end > data.total-1 ) data.end = data.total-1;
      if( current-data.begin <= 1 ) data.end = data.end + show + data.begin- current;
      if( data.end - current <= 1 ) data.begin = data.begin-show-current+ data.end;
    });
  },


  nav( page ){
      let data = this.data;
      if( page < 1 || page > data.total || page === data.current) return false;
      let evObj = { page: page }
      this.$emit('nav', evObj);

      if(!evObj.stop){
        data.current = page;
      }

      return false;
  }
});

