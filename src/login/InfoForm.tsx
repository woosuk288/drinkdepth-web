import React from 'react';
import { Box, Button, FormHelperText, Typography } from '@mui/material';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import DoneIcon from '@mui/icons-material/Done';

import { useForm } from 'react-hook-form';
import { FormInputText } from '../common/FormInputText';
import { FormInputMaskNumber } from '../common/FormInputMaskNumber';
import { FormInputDate } from '../common/FormInputDate';
import { ApolloError, useMutation, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { roleVar, userVar } from '../../apollo/client';
import { getAuth } from 'firebase/auth';
import { Company } from '../types';
import { CREATE_COMPANY_MUTATION } from '../../apollo/mutations';
import {
  createCompany,
  createCompanyVariables,
} from '../../apollo/__generated__/createCompany';

type InfoFormType = Pick<
  Company,
  | 'business_number'
  | 'company_name'
  | 'president_name'
  | 'opening_date'
  | 'business_licence'
  | 'telephone'
> & {
  files?: FileList;
};

function InfoForm() {
  const router = useRouter();
  const user = useReactiveVar(userVar);

  const [createCompany, { loading }] = useMutation<
    createCompany,
    createCompanyVariables
  >(CREATE_COMPANY_MUTATION, {
    onCompleted: (newCompany) => {
      if (newCompany.createCompany.ok) {
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
  } = useForm<InfoFormType>({
    defaultValues: { telephone: user?.phoneNumber?.replace('+82', '0') },
  });

  const file = watch('files');

  const [fileUploading, setFileUploading] = React.useState(false);

  const onSubmit = async ({ files, ...data }: InfoFormType) => {
    const regex = /[^0-9]/g;
    const business_number = data.business_number.replace(regex, '');
    const opening_date = data.opening_date.replace(regex, '');
    const reqData = { ...data, business_number, opening_date };

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
        const token = await getAuth().currentUser?.getIdToken();

        const { urls } = await (
          await fetch(uploadPath, {
            method: 'POST',
            body: formBody,
            headers: {
              authorization: token ?? '',
            },
          })
        ).json();

        if (urls?.length > 0) {
        } else {
          alert('사진 업로드 오류!');
          setFileUploading(false);
          return;
        }

        reqData.business_licence = urls[0];

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
        <FormInputText
          name="telephone"
          control={control}
          rules={{ required: '필수로 입력해주세요.' }}
          error={!!errors.telephone}
          helperText={errors.telephone?.message}
          fullWidth
          label="전화번호(회사)"
        />

        <FormInputMaskNumber
          name="business_number"
          control={control}
          rules={{
            required: '필수로 입력해주세요.',
            pattern: /^(\d{3,3})+ [-] +(\d{2,2})+ [-] +(\d{5,5})/i,
          }}
          error={!!errors.business_number}
          helperText={errors.business_number?.message}
          fullWidth
          label="사업자 등록번호"
          placeholder="숫자만 입력"
        />

        <FormInputText
          name="president_name"
          control={control}
          rules={{ required: '필수로 입력해주세요.' }}
          error={!!errors.president_name}
          helperText={errors.president_name?.message}
          fullWidth
          label="대표자성명"
        />
        <FormInputText
          name="company_name"
          control={control}
          rules={{ required: '필수로 입력해주세요.' }}
          error={!!errors.company_name}
          helperText={errors.company_name?.message}
          fullWidth
          label="상호"
        />
        <FormInputDate
          name="opening_date"
          control={control}
          rules={{
            required: '필수로 입력해주세요.',
            pattern:
              /^((19|20)\d{2})(-)(0[1-9]|1[012])(-)(0[1-9]|[12][0-9]|3[0-1])/,
          }}
          error={!!errors.opening_date}
          helperText={errors.opening_date?.message}
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
