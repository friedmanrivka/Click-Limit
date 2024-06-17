export interface AppList{
appName: string;
description: string;

}
export interface List{
    name: string;
    description: string;
    limit: number;
    creationDate: Date;
    updatedDate: Date;
    list:AppList;
    }
    
