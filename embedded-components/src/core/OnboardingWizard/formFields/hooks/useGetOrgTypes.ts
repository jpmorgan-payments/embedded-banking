import { useEffect, useState } from 'react';

import { industryCategoriesMock as industryCategories } from '@/core/OnboardingWizard/utils/industryCategories.mock';

const useGetCategories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const response = await fetch('https://api.example.com/categories');
        // const data = await response.json();
        setCategories(industryCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useGetCategories;
