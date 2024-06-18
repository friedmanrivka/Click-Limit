import AppListDal from './AppListDal';
import { AppList} from '../utils/type';
export default class AppListService{
    constructor(private appListDal:AppListDal)
    {

    }
}