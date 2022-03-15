import React from 'react';
import { Box, Button, FormHelperText, Typography } from '@mui/material';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import DoneIcon from '@mui/icons-material/Done';

import { useForm } from 'react-hook-form';
import { FormInputText } from '../common/FormInputText';
import { FormInputMaskNumber } from '../common/FormInputMaskNumber';
import { FormInputDate } from '../common/FormInputDate';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { isLoggedInVar, roleVar } from '../../apollo/client';
import { getAuth } from 'firebase/auth';

type InfoFormType = {
  businessNumber: string;
  companyName: string;
  presidentName: string;
  openingDate: string;
  businessLicence: string;
  files?: FileList;
};

const CREATE_COMPANY_MUTATION = gql`
  mutation createCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      ok
      error
      company {
        id
      }
    }
  }
`;

function InfoForm() {
  /* <
    createCompany,
    createCompanyVariables
  > */

  const router = useRouter();

  const [createCompany, { loading }] = useMutation(CREATE_COMPANY_MUTATION, {
    onCompleted: (newCompany) => {
      if (newCompany.createCompany.ok) {
        isLoggedInVar(true);
        roleVar(newCompany.createCompany.role);
        // refresh claims
        getAuth()
          .currentUser?.getIdToken(true)
          .then(() => {
            router.replace('/');
            // TODO: previousLink
          });
      } else {
        // const errorMsg = newCompany.createCompany.error;
        // "시도 횟수를 초과했습니다."
        alert(newCompany.createCompany.error);
      }
    },
    onError: (error: ApolloError) => {
      console.error(error.message);
    },
  });

  const {
    handleSubmit,
    control,
    register,
    // getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InfoFormType>();

  const file = watch('files');

  const [fileUploading, setFileUploading] = React.useState(false);

  const onSubmit = async ({ files, ...data }: InfoFormType) => {
    const regex = /[^0-9]/g;
    const businessNumber = data.businessNumber.replace(regex, '');
    const openingDate = data.openingDate.replace(regex, '');
    const reqData = { ...data, businessNumber, openingDate };

    if (!files) return;

    try {
      if (!loading) {
        setFileUploading(true);
        // 사진 있을 때 사진 업로드
        const formBody = new FormData();
        // formBody.append("file", file[0]);
        for (let i = 0; i < files.length; i++) {
          formBody.append('files', files[i]);
        }
        formBody.append('folderPath', 'companies/licenses');

        const uploadPath = process.env.NEXT_PUBLIC_UPLOAD_PATH!;
        const { urls } = await (
          await fetch(uploadPath, {
            method: 'POST',
            body: formBody,
          })
        ).json();

        if (urls?.length > 0) {
        } else {
          alert('사진 업로드 오류!');
          setFileUploading(false);
          return;
        }

        reqData.businessLicence = urls[0];

        setFileUploading(false);
      } // loading
    } catch (error) {
      alert('query error !!!');
      console.error(error);
      return;
    }

    createCompany({
      variables: {
        input: reqData,
      },
    });
  };

  const handleFileChange = () => {
    // const { files } = getValues()
    // console.log("files : ", files)
  };

  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ margin: '60px 0' }}>
        정보 입력
      </Typography>

      <Box
        component="form"
        autoComplete="off"
        sx={{
          width: {
            xs: '280px',
            sm: '400px',
          },
          '& > div': { marginBottom: '1rem' },
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <LinearProgress /> */}
        <FormInputMaskNumber
          name="businessNumber"
          control={control}
          rules={{
            required: '필수로 입력해주세요.',
            pattern: /^(\d{3,3})+ [-] +(\d{2,2})+ [-] +(\d{5,5})/i,
          }}
          error={!!errors.businessNumber}
          helperText={errors.businessNumber?.message}
          fullWidth
          label="사업자 등록번호"
          placeholder="숫자만 입력"
        />

        <FormInputText
          name="presidentName"
          control={control}
          rules={{ required: '필수로 입력해주세요.' }}
          error={!!errors.presidentName}
          helperText={errors.presidentName?.message}
          fullWidth
          label="대표자성명"
        />
        <FormInputText
          name="companyName"
          control={control}
          rules={{ required: '필수로 입력해주세요.' }}
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
          fullWidth
          label="상호"
        />
        <FormInputDate
          name="openingDate"
          control={control}
          rules={{
            required: '필수로 입력해주세요.',
            pattern:
              /^((19|20)\d{2})(-)(0[1-9]|1[012])(-)(0[1-9]|[12][0-9]|3[0-1])/,
          }}
          error={!!errors.openingDate}
          helperText={errors.openingDate?.message}
          fullWidth
          label="개업년월일"
        />

        {file?.length !== 1 ? (
          <label htmlFor="button-file-business-licence">
            <Button
              component="span"
              fullWidth
              variant="outlined"
              color="inherit"
              aria-label="upload picture"
              size="large"
              startIcon={<UploadFileIcon />}
            >
              사업자 등록증 업로드
            </Button>
            <FormHelperText
              error={!!errors.files}
              sx={{ mr: '14px', ml: '14px' }}
            >
              {errors.files && '사업자 등록증을 추가해주세요.'}
            </FormHelperText>
          </label>
        ) : (
          <>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<DoneIcon />}
              onClick={() => setValue('files', undefined)}
              sx={{ mb: '3px' }}
            >
              사업자 등록증
            </Button>
            <Typography align="center">{file[0].name}</Typography>
          </>
        )}

        <input
          {...register('files', {
            required: true,
            onChange: () => handleFileChange(),
          })}
          accept="image/jpeg, image/png, application/pdf"
          id="button-file-business-licence"
          type="file"
          style={{ display: 'none' }}
        />

        <Button
          disabled={loading || fileUploading}
          type="submit"
          fullWidth
          variant="contained"
          aria-label="ask for sign-in"
          size="large"
          sx={{ marginTop: '3rem', fontSize: 18, fontWeight: 'bold' }}
        >
          가입 신청
        </Button>
      </Box>
    </>
  );
}

export default InfoForm;
