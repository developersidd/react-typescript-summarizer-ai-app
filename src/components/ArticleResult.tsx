import { loader } from '@/assets';
import type { Error } from './../redux/Features/article/articleAPI';
import { Article } from './Demo';

type ArticleResultProps = {
    isLoading: boolean,
    isFetching: boolean,
    error: Error | any,
    isError: boolean,
    article: Article
};


const ArticleResult = ({ isLoading, isFetching, error, isError, article }: ArticleResultProps) => {

    // decide what to render in Result part
    let content = null;

    if (isLoading || isFetching) {
        content = (<img src={loader} alt='loader' className='w-20 h-20 object-contain' />)
    }

    else if (isError && error?.data) {
        content = (<p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
                {error.data?.error}
            </span>
        </p>)

    } else if (!isLoading && !isError && article.summary.length > 0) {
        content = (<div className='flex flex-col gap-3'>
            <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
            </h2>
            <div className='summary_box shadow-md '>
                <p className='font-inter font-medium text-sm text-gray-700'>
                    {article.summary}
                </p>
            </div>
        </div>)
    }


    return (
        <div className="my-10 max-w-full flex justify-center items-center">
            {
                content
            }
        </div>
    )
}

export default ArticleResult