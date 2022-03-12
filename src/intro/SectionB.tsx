import { Box, Typography } from '@mui/material'
import React from 'react'

function SectionB() {
  return (
    <Box mt="160px">
      <Typography
        variant="h1"
        fontWeight={700}
        sx={{
          fontSize: { xs: 36, md: 50, lineHeight: 1.32, marginBottom: 60 },
        }}
      >
        드링크뎁스는 어떤 팀 인가요?
      </Typography>

      <Typography
        variant="h6"
        color="InfoText"
        fontWeight={400}
        sx={{ lineHeight: { xs: 1.3, md: 1.6 } }}
      >
        <p>
          혹시 ＇오늘 뭐 마시지?＇라는 고민 해보신적 없으신가요? 우리가
          살아가는데 있어서 수분은 필수적입니다. 인간의 신체는 50% 이상 수분으로
          이루어져 매일 수분을 필요로 하고 있죠.
        </p>
        <br />
        <p>
          하지만 매일 물만 마시면 질리기 마련입니다. 우리는 더욱 특별한 마실
          것을 원하죠. 인류는 오래 전부터 음료를 즐겨 마셨습니다. 하지만 음료를
          선택을 하는데 있어서 모두 개개인의 가치가 다릅니다.
        </p>
        <br />
        <p>
          건강 때문에? 맛 때문에? 향 때문에? 분위기 때문에? 여러분들은 어떠한
          이유로 어떤 음료를 선택하시나요?
        </p>
        <br />
        <p>
          드링크뎁스는 ‘이왕이면 다홍치마’ 라는 말을 좋아합니다. ‘마시다’ 라는
          영역에서 보다 더 나은 경험을 제공하고자 합니다.
        </p>
        <br />
        <p>
          그에 따라 우리의 일상에 있어서 마시는 즐거움과 경험의 깊이를
          제공하고자 합니다. 그런 경험의 깊이를 제공하는데 있어서 장벽을 하나
          둘씩 없애가고자 하는 것이 드링크뎁스의 궁극적 목표입니다.
        </p>
      </Typography>
    </Box>
  )
}

export default SectionB
