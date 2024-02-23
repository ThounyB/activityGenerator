import { useEffect, useState } from "react";
import "./categories.css";
import Suggestions from "./Suggestions";
const categories = ["education", "social", "relaxation", "cooking"];

export interface Suggestion {
    activity: string;
    type: string;
    price: string;
    key: string;
}

function filterDuplicates(suggestions: Suggestion[]): Suggestion[] {
    const uniqueObjects: { [key: string]: Suggestion } = {};
    suggestions.forEach((obj: Suggestion) => {
        uniqueObjects[JSON.stringify(obj)] = obj;
    });
    return Object.values(uniqueObjects);
}

function Categories() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    const [allSuggestions, setAllSuggestions] = useState<Suggestion[]>([]);

    useEffect(() => {
        if (!selectedCategory) {
            return;
        }

        const fetchData = async () => {
            const fetchCount = [1, 2, 3];
            let result: Suggestion;
            let suggestions: Suggestion[] = [];
            try {
                const fetchPromises = fetchCount.map(async () => {
                    const response = await fetch(
                        `https://www.boredapi.com/api/activity?type=${selectedCategory}`
                    );

                    result = await response.json();

                    return result;
                });

                suggestions = await Promise.all(fetchPromises);

                const filtered = filterDuplicates(suggestions);

                if (filtered.length < 3) {
                    const response = await fetch(
                        `https://www.boredapi.com/api/activity?type=${selectedCategory}`
                    );

                    result = await response.json();

                    filtered.push(result);
                }
                setAllSuggestions(filtered);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedCategory]);

    function changeCategory(category: string) {
        setSelectedCategory(category);
    }

    return (
        <div className="categories">
            <ul className="list">
                {categories.map((category, idx) => {
                    return (
                        <li key={idx}>
                            <button
                                key={category}
                                onClick={() => changeCategory(category)}
                            >
                                {category}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <Suggestions suggestions={allSuggestions} />
        </div>
    );
}

export default Categories;
