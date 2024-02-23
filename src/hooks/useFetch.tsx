import { useEffect, useState } from "react";

export default async function useFetch(category: string | null) {
    const [data, setData] = useState();

    console.log("From hook", category);
    useEffect(() => {
        fetch(`https://www.boredapi.com/api/activity?type=${category}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, [category]);

    return data;
}
