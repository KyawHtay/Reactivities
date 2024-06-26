
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest{
            public Activity Activity {get;set;}
        }
        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator() 
            { 
                RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Hanlder : IRequestHandler<Command>
        {
        private readonly DataContext _context;

            public Hanlder(DataContext context)
            {
            this._context = context;
                
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
            }
        }
    }
}