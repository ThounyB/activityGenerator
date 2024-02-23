import React from "react";
import { Suggestion } from "./Categories";
import "./suggestions.css";

interface Props {
    suggestions: Suggestion[];
}

const Suggestions: React.FC<Props> = (props) => {
    const { suggestions } = props;
    return (
        <div className="suggestions">
            <ul className="suggestion-list">
                {suggestions.map((suggestion) => (
                    <li key={suggestion.key}>
                        {suggestion.activity}{" "}
                        {suggestion.link ? (
                            <a className="link" href={`${suggestion.link}`}>
                                link
                            </a>
                        ) : (
                            ""
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Suggestions;
