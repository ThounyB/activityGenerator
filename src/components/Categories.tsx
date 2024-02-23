import { useEffect, useState } from "react";
import "./categories.css";
import Suggestions from "./Suggestions";
const categories = [
    { type: "education", iconUrl: "education.png" },
    { type: "social", iconUrl: "education.png" },
    { type: "relaxation", iconUrl: "education.png" },
    { type: "cooking", iconUrl: "education.png" },
];

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
            <ul className="category-list">
                {Object.values(categories).map((category, idx) => {
                    return (
                        <li key={idx}>
                            <button
                                style={{
                                    backgroundImage: 'url("/education.png")',
                                }}
                                onClick={() => changeCategory(category.type)}
                            >
                                {category.type}
                                <i className="fa-solid fa-couch"></i>
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
