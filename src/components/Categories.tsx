import { useEffect, useState } from "react";
import "./categories.css";
import Suggestions from "./Suggestions";
const categories = [
    { type: "education", faIcon: "fa-user-graduate" },
    { type: "social", faIcon: "fa-user-group" },
    { type: "relaxation", faIcon: "fa-heart" },
    { type: "cooking", faIcon: "fa-utensils" },
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
            <h1 className="title">Let me help you to find activity</h1>
            <ul className="category-list">
                {Object.values(categories).map((category, idx) => {
                    return (
                        <li key={idx}>
                            <button
                                onClick={() => changeCategory(category.type)}
                                title={`Activity type ${category.type}`}
                            >
                                {category.type}
                                <i
                                    className={`fa-solid ${category.faIcon} faIcon`}
                                ></i>
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
