using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DriveSync.Validation
{
    public class ExceptionValidation : Exception
    {
        public ExceptionValidation(string error) : base(error)
        {

        }

        public static void When(bool hasError, string error)
        {
            if(hasError)
            {
                throw new ExceptionValidation(error);
            }
        }
    }
}
