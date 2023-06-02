import { useLazyGetSummaryQuery } from "@features/article/articleAPI";
import React, { FormEvent, useEffect, useState } from 'react';
import { copy, linkIcon, loader } from "../assets";

type Article = {
  summary: string,
  url: string,
}


const Demo = () => {

  const [article, setArticle] = useState<Article>({
    url: "",
    summary: ""
  });

  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [getSummary, { isLoading, error, isError }] = useLazyGetSummaryQuery();
  console.log("error:", error)
  // decide what to render in Result part
  let content = null;

  if (isLoading) {
    content = (<img src={loader} alt='loader' className='w-20 h-20 object-contain' />)
  }

  else if (isError && error && 'message' in error) {

    content = (<p className='font-inter font-bold text-black text-center'>
      Well, that wasn't supposed to happen...
      <br />
      <span className='font-satoshi font-normal text-gray-700'>
        {error.message}
        Error
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

  // save all articles to the localStorage
  useEffect(() => {
    const articlesFromLocalStorage = localStorage.getItem("articles");
    const articleUrlFromLocalStorage = localStorage.getItem("articleUrl");
    if (articlesFromLocalStorage && articleUrlFromLocalStorage) {
      const parsedArticles: Article[] = JSON.parse(articlesFromLocalStorage);
      const parsedArticleUrl: string = JSON.parse(articleUrlFromLocalStorage);
      const selectedArticle = parsedArticles.find(item => item.url === parsedArticleUrl);

      setAllArticles(parsedArticles);
      if (selectedArticle?.url) {
        setArticle(selectedArticle);
      }
    }
  }, []);

  // set user given article url
  const handleSetArticle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, url: e.target.value })
  }

  // handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      localStorage.setItem("articleUrl", JSON.stringify(article.url));
    }
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className="flex flex-col gap-2 w-full">
        <form action="" className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link_icon" className='w-5 absolute left-0 my-2 ml-3' />
          <input type="url" name="" id="" placeholder='Enter your URL' value={article.url} onChange={handleSetArticle} required className='url_input peer' />
          <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
            <img className='w-6' src="https://cdn-icons-png.flaticon.com/128/7046/7046131.png" alt="submit_icon" />
          </button>
        </form>

        {/* Browser URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto shadow-sm">
          {allArticles.map((article, index) => (
            <div key={`link-${index}`} onClick={() => {
              setArticle(article)
              localStorage.setItem("articleUrl", JSON.stringify(article.url));
            }} className="link_card">
              <div className="copy_btn">
                <img src={copy} alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-sm truncate text-blue-700">
                {article.url}
              </p>
            </div>
          ))}

        </div>
      </div>
      {/*  Display Results */}

      <div className="my-10 max-w-full flex justify-center items-center">
        {
          content
        }
      </div>

    </section>
  )
}

export default Demo;
