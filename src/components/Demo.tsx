import { useLazyGetSummaryQuery } from "@features/article/articleAPI";
import React, { FormEvent, useEffect, useState } from 'react';
import { copy, linkIcon, tick, trash } from "../assets";
import ArticleResult from "./ArticleResult";

export type Article = {
  summary: string,
  url: string,
}

const Demo = () => {

  const [article, setArticle] = useState<Article>({
    url: "",
    summary: ""
  });

  const [copiedUrl, setCopiedUrl] = useState<string>("");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [getSummary, { isLoading, isFetching, error, isError }] = useLazyGetSummaryQuery();


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

  // set article from history
  const setHistoryArticle = async (article: Article) => {
    localStorage.setItem("articleUrl", JSON.stringify(article.url));
    if (isError) {
     location.reload();
    }
    setArticle(article);
  }

  // handle copy to clipboard
  const handleCopy = (url: string) => {
    setCopiedUrl(url);
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setCopiedUrl("");
    }, 2000);
  }

  // handle delete to clipboard
  const handleDelete = (url: string) => {
    const filteredArticles = allArticles.filter(item => item.url !== url);
    setAllArticles(filteredArticles);
    localStorage.setItem("articles", JSON.stringify(filteredArticles));
    setArticle({ url: "", summary: "" });
  }


  // set user given article url
  const handleSetArticle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, url: e.target.value })
  }

  // handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // prevent fecthing data if already exist
    if (allArticles.find(item => item.url === article.url)?.url) return;
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
            <div key={`link-${index}`} className="link_card">
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img src={copiedUrl === article.url ? tick : copy} alt="copy_icon"
                  className="w-[55%] h-[55%] object-contain"
                />
              </div>
              <p onClick={() => setHistoryArticle(article)} className="flex-1 font-satoshi text-sm truncate text-blue-700 cursor-pointer">
                {article.url}
              </p>
              <div className="trash_btn" onClick={() => handleDelete(article.url)}>
                <img src={trash} alt="trash_icon"
                  className="w-[75%] h-[75%] object-contain"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
      {/*  Display Results */}

      <ArticleResult isLoading={isLoading} isFetching={isFetching} isError={isError} error={error} article={article} />


    </section>
  )
}

export default Demo;
