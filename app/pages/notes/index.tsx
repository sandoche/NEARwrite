import LoadingAnimation from '@/components/common/LoadingAnimation';
import NotesContainer from '@/components/notes/NotesContainer';
import signInOptions from '@/config/near';
import useWallet from '@/modules/near-api-react/hooks/useWallet';
import NearAuthenticationGuard from '@/modules/near-api-react/utilities/NearAuthenticationGuard';

const Notes = () => {
  const wallet = useWallet();

  const redirectToLoginPage = () => {
    wallet?.requestSignIn(signInOptions, 'NEARwrite');
  };

  if (!wallet) {
    return <LoadingAnimation />;
  }

  return (
    <NearAuthenticationGuard loggedInCallback={redirectToLoginPage}>
      <NotesContainer />
    </NearAuthenticationGuard>
  );
};

export default Notes;
