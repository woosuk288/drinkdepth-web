import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = {
  hotBean: HotBeanType;
};
function HotBean({ hotBean }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          color="red"
          fontSize={18}
          lineHeight={1.2}
          gutterBottom
        >
          {hotBean.no}. {hotBean.name}
        </Typography>

        <Typography variant="subtitle2" fontWeight={600}>
          🌕 향미노트
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {hotBean.flavors.join(', ')}
        </Typography>

        <Typography variant="subtitle2" fontWeight={600}>
          🌕 특징
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {hotBean.feature}
        </Typography>

        <Typography variant="subtitle2" fontWeight={600}>
          🌕 주요로스터
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {hotBean.roasters.join(', ')}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
export default HotBean;
