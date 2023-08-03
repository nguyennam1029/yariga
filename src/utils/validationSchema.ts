import { PropertyItemData } from '@/types/property.types';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('please enter title'),
  address: Yup.string().required('please enter address.'),
facilityBeds: Yup.number().required('please enter beds.'),
 image: Yup.array()
    .of(Yup.string())
    .min(1, 'Please enter at least one image.')
    .required('Please enter images.')
    .transform((value) => {
      // Xử lý dữ liệu nhập thành mảng nếu value là chuỗi
      if (typeof value === 'string') {
        return value.split(',').map((item) => item.trim());
      }
      return value;
    }),
  description: Yup.string().required('please enter description.'),
  
  rating: Yup.number().min(1, 'lowest rating is 1').max(5,'The highest rating is 5').required('Please enter rating'),
});

export default validationSchema;
