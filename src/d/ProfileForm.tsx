import {
  Avatar,
  Box,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  OutlinedInput,
  Typography,
} from '@mui/material';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { updateProfile } from 'firebase/auth';
import React, { RefObject, useEffect } from 'react';
import { resize_image_file } from 'src/utils/resizeImages';
import { useRouter } from 'next/router';
import { PROFILE_PATH } from 'src/utils/routes';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage, DB_PROFILES } from 'src/firebase/services';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

type ProfileFormProps = {
  me: ProfileType;
  submitRef: RefObject<HTMLInputElement>;
  setIsEditValid: React.Dispatch<React.SetStateAction<boolean>>;
};
function ProfileForm({ me, submitRef, setIsEditValid }: ProfileFormProps) {
  const router = useRouter();
  // const [showPhone, setShowPhone] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string>();
  const [previewFile, setPreviewFile] = React.useState<File>();

  const formik = useFormik({
    initialValues: {
      displayName: me.displayName,
      // phoneNumber: me.phoneNumber,
      photoURL: me.photoURL,
      biography: me?.biography,
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(2, '최소 2 ~ 최대 20 글자 수')
        .max(20, '최소 2 ~ 최대 20 글자 수')
        .required('필수 입니다!'),
    }),
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      setErrors({ displayName: '' });

      try {
        let newPhotoURL: string | null = null;
        if (previewImage?.startsWith('data:image')) {
          const uploadResult = await uploadString(
            ref(storage, `d/${DB_PROFILES}/${me.id}/${previewFile?.name}`),
            previewImage,
            'data_url'
          );

          newPhotoURL = await getDownloadURL(uploadResult.ref);
        }

        await updateProfile(auth.currentUser!, {
          displayName: values.displayName,
          photoURL: newPhotoURL || values.photoURL,
        });

        await setDoc(
          doc(db, `${DB_PROFILES}/${me.id}`),
          {
            displayName: values.displayName,
            biography: values.biography,
            photoURL: newPhotoURL || values.photoURL,
            updatedAt: new Date(),
          },
          { merge: true }
        );

        router.replace(PROFILE_PATH + '/' + me.id);
      } catch (error: any) {
        setSubmitting(false);
        // User couldn't sign in (bad verification code?)
        // ...

        console.log('error : ', error);
        setErrors({ displayName: '업데이트 중 오류 발생!' });
      }
    },
  });

  useEffect(() => {
    if (formik.dirty && formik.isValid) {
      setIsEditValid(true);
    } else {
      setIsEditValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.dirty, formik.isValid]);

  // const handleClickShowPassword = () => {
  //   setShowPhone((prev) => !prev);
  // };

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files?.length === 0) return;

    resize_image_file(files[0]).then(({ dataURL }) => {
      setPreviewImage(dataURL);
      setPreviewFile(files[0]);
      formik.setFieldValue('photoURL', dataURL);
    });
  };

  const handleDeletePreview = () => {
    // 파일 변경 있으면
    setPreviewImage(undefined);
    setPreviewFile(undefined);
    formik.setFieldValue('photoURL', me.photoURL);
  };

  return (
    <>
      {formik.isSubmitting && <LinearProgress />}

      <Container maxWidth="sm">
        <CardHeader
          sx={{ paddingX: 0 }}
          avatar={
            <div style={{ position: 'relative' }}>
              <label htmlFor="profile-image-button-file">
                <Avatar
                  src={previewImage || (me.photoURL ?? '')}
                  alt={me.displayName ?? ''}
                  sx={{
                    width: { xs: 80, sm: 120, md: 160 },
                    height: { xs: 80, sm: 120, md: 160 },
                    marginRight: '1rem',
                    cursor: 'pointer',
                  }}
                ></Avatar>
              </label>
              {previewImage && (
                <IconButton
                  aria-label="delete picture"
                  component="span"
                  onClick={handleDeletePreview}
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    left: '-8px',
                    bottom: '-8px',
                    padding: '8px',
                  }}
                >
                  <RemoveCircleOutlineIcon fontSize="small" />
                </IconButton>
              )}
            </div>
          }
          title={
            <Typography variant="h6" component="h2" gutterBottom>
              {me.displayName}
            </Typography>
          }
          subheader={
            <>
              {me.lastSignInTime && (
                <Typography
                  variant="body2"
                  component="div"
                  style={{ height: '30.75px' }}
                >
                  {new Date(me.lastSignInTime).toLocaleString()}
                  <p>마지막 로그인 시간</p>
                </Typography>
              )}
            </>
          }
        />

        <Box
          component="form"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          sx={{
            '& .MuiFormControl-root': {
              width: '100%',
              maxWidth: '400px',
              marginBottom: '0.5rem',
            },
            '& .MuiFormLabel-root': {
              padding: '16px 0px 8px',
              color: '#262626',
              fontWeight: '600px',
            },
          }}
        >
          <input
            accept="image/*"
            hidden
            id="profile-image-button-file"
            name="photoURL"
            type="file"
            onChange={handleFileChange}
            // onChange={formik.handleChange}
          />

          {/* <FormControl component="fieldset" variant="outlined">
            <FormLabel htmlFor="me-profile-phone">전화번호</FormLabel>
            <OutlinedInput
              id="standard-adornment-phone"
              size="small"
              type={showPhone ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPhone ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
          </FormControl> */}
          <FormControl component="fieldset">
            <FormLabel htmlFor="me-profile-name">이름(별명)</FormLabel>
            <OutlinedInput
              id="me-profile-name"
              name="displayName"
              size="small"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              error={
                formik.touched.displayName && Boolean(formik.errors.displayName)
              }
            />
            <FormHelperText>
              {formik.touched.displayName && formik.errors.displayName}
            </FormHelperText>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel htmlFor="me-profile-bio">소개 or 메모</FormLabel>
            <OutlinedInput
              size="small"
              id="me-profile-bio"
              name="biography"
              value={formik.values.biography}
              onChange={formik.handleChange}
              multiline
              rows={3}
            />
          </FormControl>

          <input ref={submitRef} hidden type="submit" />
        </Box>
      </Container>
    </>
  );
}
export default ProfileForm;
