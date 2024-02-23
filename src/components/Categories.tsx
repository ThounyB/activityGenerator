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
    participants: string;
    link: string;
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selectedCategory) {
            return;
        }

        const fetchData = async () => {
            const fetchCount = [1, 2, 3];
            let result: Suggestion;

            setLoading(true);

            try {
                const fetchPromises = fetchCount.map(async () => {
                    const response = await fetch(
                        `https://www.boredapi.com/api/activity?type=${selectedCategory}`
                    );

                    const result = await response.json();

                    return result;
                });

                const suggestions = await Promise.all(fetchPromises);

                const filtered = filterDuplicates(suggestions);

                // When there is duplicate suggestion, fetch a new one
                if (filtered.length < 3) {
                    const response = await fetch(
                        `https://www.boredapi.com/api/activity?type=${selectedCategory}`
                    );

                    result = await response.json();

                    filtered.push(result);
                }
                setAllSuggestions(filtered);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCategory]);

    function changeCategory(category: string) {
        setSelectedCategory(null);
        setSelectedCategory(category);
        setLoading(false);
    }

    return (
        <div className="main">
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
            <div className="lower">
                {allSuggestions.length > 0 ? (
                    <Suggestions suggestions={allSuggestions} />
                ) : loading ? (
                    <i className="fa-solid fa-spinner spinner"></i>
                ) : (
                    <i className="fa-solid fa-sun spinner sun"></i>
                )}
            </div>
        </div>
    );
}

export default Categories;
