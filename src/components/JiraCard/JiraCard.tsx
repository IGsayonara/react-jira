import { FaEdit } from 'react-icons/fa';

import './JiraCard.scss';

interface props {
  title: string;
  description: string;
}

function JiraCard({ title, description }: props) {
  return (
    <div className="jira-card">
      <div className="jira-card__header">
        <div className="jira-card__title">{title}</div>
        <div className="jira-card_edit_icon">
          <FaEdit cursor="pointer" />
        </div>
      </div>

      <div className="jira-card__description">{description}</div>
    </div>
  );
}

export default JiraCard;
