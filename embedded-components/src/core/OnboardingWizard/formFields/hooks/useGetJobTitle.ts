import { useEffect, useState } from 'react';

const jobTitles = [
  'CEO',
  'CFO',
  'COO',
  'President',
  'Chairman',
  'Senior Branch Manager',
  'Other',
];

const useGetJobTitle = () => {
  const [jobTypes, setJobTypes] = useState<string[]>([]);

  useEffect(() => {
    // Fetch job types from an API or any other data source
    const fetchJobTypes = async () => {
      try {
        // const response = await fetch('/api/jobTypes'); // Replace with your API endpoint
        // const data = await response.json();
        setJobTypes(jobTitles);
      } catch (error) {
        console.error('Error fetching job types:', error);
      }
    };

    fetchJobTypes();
  }, []);

  return jobTypes;
};

export default useGetJobTitle;
