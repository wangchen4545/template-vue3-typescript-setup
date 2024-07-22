import { queryStallNew} from '../utils/service'
import config from '@/utils/config'
export function hookTest<T>() {
    const test = async ()=>{
        const res = await queryStallNew({
          systemCode: config.SYSTEM_CODE,
          stallNo: '04220715121437000144'
        })
    }

    return {
        test
    }
}