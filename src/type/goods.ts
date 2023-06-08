export interface ListInt{
    userId:number,
    id:number,
    title:string,
    introduce:string,
}
interface selectDataInt{
    title:string,
    introduce:string,
    page:number, //页码
    count:number, //总条数
    pagesize:number, //默认一页显示几条
}
export class InitData{
    selectData:selectDataInt={  //搜索框的数据类型
        title:"",
        introduce:"",
        page:1,
        count:0,
        pagesize:5
    }
    list:ListInt[]=[] //需要展示的所有商品(后台返回的数据)是ListInt型的数组
}