import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' }
];

const orientationOptions = [
  { value: 'straight', label: 'Straight' },
  { value: 'gay', label: 'Gay' },
  { value: 'lesbian', label: 'Lesbian' },
  { value: 'bisexual', label: 'Bisexual' },
  { value: 'pansexual', label: 'Pansexual' },
  { value: 'asexual', label: 'Asexual' },
  { value: 'other', label: 'Other' }
];

const ProfileForm: React.FC = () => {
  const { state, updateProfile } = useAuth();
  const user = state.user;
  
  const [formData, setFormData] = useState({
    gender: user?.gender || '',
    orientation: user?.orientation || '',
    bio: user?.bio || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { gender, orientation, bio } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!gender) newErrors.gender = 'Gender is required';
    if (!orientation) newErrors.orientation = 'Sexual orientation is required';
    if (!bio) newErrors.bio = 'Bio is required';
    else if (bio.length < 10) newErrors.bio = 'Bio must be at least 10 characters';
    else if (bio.length > 500) newErrors.bio = 'Bio must be less than 500 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await updateProfile(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Profile</h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={onChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
            >
              <option value="">Select your gender</option>
              {genderOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
          </div>
          
          <div>
            <label htmlFor="orientation" className="block text-sm font-medium text-gray-700 mb-1">
              Sexual Orientation
            </label>
            <select
              id="orientation"
              name="orientation"
              value={orientation}
              onChange={onChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                errors.orientation ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
            >
              <option value="">Select your orientation</option>
              {orientationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.orientation && <p className="mt-1 text-sm text-red-600">{errors.orientation}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={bio}
            onChange={onChange}
            placeholder="Tell us about yourself..."
            className={`appearance-none block w-full px-3 py-2 border ${
              errors.bio ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
          />
          {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
          <p className="mt-1 text-sm text-gray-500">
            {bio.length}/500 characters
          </p>
        </div>
        
        {/* Image upload section will be added later */}
        <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
          <p className="text-gray-500">Image upload functionality will be implemented later</p>
        </div>
        
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Save Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;