import React from "react";
import { Suggestion } from "./Categories";
import "./suggestions.css";

interface Props {
    suggestions: Suggestion[];
}

const Suggestions: React.FC<Props> = (props) => {
    const { suggestions } = props;
    return (
        <ul className="suggestion-list">
            {suggestions.map((lu) => (
                <li>{lu.activity}</li>
            ))}
        </ul>
    );
};

export default Suggestions;
