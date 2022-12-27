import { Button, LinearProgress } from '@mui/material';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useFirestore, useUser } from 'reactfire';
import AuthContainer from 'src/d/AuthContainer';
import HeaderD from 'src/d/HeaderD';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import ProfileForm from 'src/d/ProfileForm';
import { fetchProfile } from 'src/firebase/services';
import { FETCH_PROFILE_KEY } from 'src/utils/queryKeys';

const ProfileEditPage: NextPage = () => {
  return (
    <>
      <NextSeo title="프로필 수정" />
      <AuthContainer>
        <ProfileEditContainer />

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default ProfileEditPage;

function ProfileEditContainer() {
  const db = useFirestore();
  const { status, data: user } = useUser();

  const submitRef = useRef<HTMLInputElement>(null);
  const [isEditValid, setIsEditValid] = useState(false);
  const { isLoading, data, error } = useQuery(
    FETCH_PROFILE_KEY,
    () => fetchProfile(db, user!.uid),
    { enabled: !!user }
  );

  const handleUpdate = () => {
    submitRef.current?.click();
  };

  if (status === 'loading' || isLoading) return <LinearProgress />;
  if (error) return <div>오류가 발생했습니다!</div>;
  if (!data) return <div>데이터가 존재하지 않습니다.</div>;

  return (
    <>
      <HeaderD
        leftIcon="back"
        centerComponent="프로필 수정"
        rightIcon={
          <Button
            sx={{ fontSize: 16, fontWeight: 600, padding: 0, minWidth: 44 }}
            onClick={handleUpdate}
            disabled={!isEditValid}
          >
            수정
          </Button>
        }
      />

      <Main>
        <ProfileForm
          me={data}
          submitRef={submitRef}
          setIsEditValid={setIsEditValid}
        />
      </Main>

      <Navbar />
    </>
  );
}
