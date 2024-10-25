import {AppRoute} from "../../../const.ts";
import {Link} from "react-router-dom";

export function EditButton({surveyId} : ButtonProps) {
    return (
        <Link to={`${AppRoute.FormBuilder}/${surveyId}`}>
            <button>
                <img src="/icons/icon-edit.svg" alt="Редактировать"/>
            </button>
        </Link>
    );
}
