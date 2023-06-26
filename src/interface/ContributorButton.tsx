import makeContributorUrl from 'common/makeContributorUrl';
import Modal from 'interface/Modal';
import { useState, lazy } from 'react';
import { Link } from 'react-router-dom';

const ContributorDetails = lazy(
  () => import(/* webpackChunkName: 'ContributorPage' */ './ContributorDetails'),
);

interface Props {
  nickname: string;
  avatar?: string;
  link?: boolean;
}

export type ContributorType = Props;

const ContributorButton = ({ nickname, avatar, link = true }: Props) => {
  const [open, setOpen] = useState(false);

  let content = (
    <div className="contributor">
      {avatar && <img loading="lazy" src={avatar} alt={`${nickname}'s contributor avatar`} />}
      {nickname}
    </div>
  );

  if (link) {
    content = (
      <Link
        to={makeContributorUrl(nickname)}
        onClick={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <>
      {content}
      {open && (
        <Modal id="contributor-button" onClose={() => setOpen(false)}>
          <ContributorDetails contributorId={nickname} />
        </Modal>
      )}
    </>
  );
};

export default ContributorButton;
