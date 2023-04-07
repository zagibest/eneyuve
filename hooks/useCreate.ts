import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const useCreate = (key = "create"): [boolean, (value: boolean) => void] => {
  const router = useRouter();
  const b = router.query[key];
  const [visible, setVisible] = useState(typeof b === "string" && b === "true");
  const handleChange = useCallback(
    (value: boolean) => {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, [key]: value },
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [key, router]
  );
  useEffect(() => {
    if (typeof router.query[key] !== "undefined") {
      const q = router.query[key];
      setVisible(typeof q === "string" && q === "true");
    }
  }, [key, router.query]);
  return [visible, handleChange];
};

export default useCreate;
