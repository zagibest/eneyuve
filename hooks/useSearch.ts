import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

const useSearch = (
  key = "q"
): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const router = useRouter();
  const q = router.query[key];
  const [keyword, setKeyword] = useState(typeof q === "string" ? q : "");
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, [key]: e.target.value },
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router, key]
  );
  useEffect(() => {
    if (typeof router.query[key] !== "undefined") {
      const u = router.query[key];
      setKeyword(typeof u === "string" ? u : "");
    }
  }, [key, router.query]);
  return [keyword, handleChange];
};

export default useSearch;
